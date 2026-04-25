import { NextRequest, NextResponse } from "next/server";
import { AuthError } from "@/lib/server/auth";
import { requireAdminRequest } from "@/lib/adminGuard";
import { supabase } from "@/lib/supabaseClient";

export const runtime = "nodejs";

function normalizeDomain(rawValue: string) {
  return rawValue.trim().toLowerCase();
}

function isValidDomain(domain: string) {
  return /^[a-z0-9.-]+\.[a-z]{2,}$/i.test(domain);
}

export async function GET(request: NextRequest) {
  try {
    await requireAdminRequest(request);

    if (!supabase) {
      return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
    }

    const { data, error } = await supabase
      .from("student_domains")
      .select("id,domain,created_at")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json({ domains: data ?? [] });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    return NextResponse.json({ error: "Failed to load student domains." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdminRequest(request);

    if (!supabase) {
      return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
    }

    const body = (await request.json()) as { domain?: unknown };
    if (typeof body.domain !== "string" || !body.domain.trim()) {
      return NextResponse.json({ error: "domain is required." }, { status: 400 });
    }

    const domain = normalizeDomain(body.domain);
    if (!isValidDomain(domain)) {
      return NextResponse.json({ error: "Enter a valid domain." }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("student_domains")
      .upsert({ domain }, { onConflict: "domain" })
      .select("id,domain,created_at")
      .maybeSingle();

    if (error) {
      throw error;
    }

    return NextResponse.json({ domain: data ?? { domain } });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    return NextResponse.json({ error: "Failed to add student domain." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await requireAdminRequest(request);

    if (!supabase) {
      return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
    }

    const domain = request.nextUrl.searchParams.get("domain");
    if (!domain) {
      return NextResponse.json({ error: "domain is required." }, { status: 400 });
    }

    const normalizedDomain = normalizeDomain(domain);
    const { error } = await supabase.from("student_domains").delete().eq("domain", normalizedDomain);

    if (error) {
      throw error;
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    return NextResponse.json({ error: "Failed to remove student domain." }, { status: 500 });
  }
}
