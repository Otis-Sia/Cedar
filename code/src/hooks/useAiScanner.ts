import { useState } from "react";

const ALLOWED_FILE_REGEX = /\.(pdf|docx)$/i;
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
const PDFJS_WORKER_VERSION = "5.6.205";

type ScanResult = Record<string, unknown>;
type ParseCvResponse = {
  portfolio?: ScanResult;
  error?: string;
};

export interface ScanStatus {
  isScanning: boolean;
  progress: number;
  statusText: string;
  error: string | null;
}

export function useAiScanner() {
  const [scanState, setScanState] = useState<ScanStatus>({
    isScanning: false,
    progress: 0,
    statusText: "",
    error: null,
  });

  const extractText = async (file: File) => {
    const extension = file.name.split(".").pop()?.toLowerCase();

    if (extension === "pdf") {
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_WORKER_VERSION}/pdf.worker.min.mjs`;
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let fullText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item) => ("str" in item ? item.str : ""))
          .filter(Boolean)
          .join(" ");
        fullText += `${pageText}\n`;
      }
      return fullText;
    }

    if (extension === "docx") {
      const mammoth = await import("mammoth");
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.default.extractRawText({ arrayBuffer });
      return result.value;
    }

    throw new Error("Unsupported file format. Please upload a PDF or DOCX file.");
  };

  const startAiScan = async (
    file: File,
    onComplete: (data: ScanResult) => void
  ) => {
    if (!file) {
      setScanState((prev) => ({
        ...prev,
        error: "Please upload a CV/Resume file first.",
      }));
      return;
    }

    if (!ALLOWED_FILE_REGEX.test(file.name)) {
      setScanState((prev) => ({
        ...prev,
        error: "Only PDF and DOCX files are supported.",
      }));
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setScanState((prev) => ({
        ...prev,
        error: "File is too large. Maximum size is 10MB.",
      }));
      return;
    }

    setScanState({
      isScanning: true,
      progress: 5,
      statusText: "Validating document…",
      error: null,
    });

    try {
      setScanState((prev) => ({
        ...prev,
        progress: 20,
        statusText: "Extracting raw text layer…",
      }));
      const cvText = await extractText(file);

      if (!cvText.trim()) {
        throw new Error("Could not extract any text from the document.");
      }

      setScanState((prev) => ({
        ...prev,
        progress: 55,
        statusText: "Mapping extracted data to portfolio fields…",
      }));

      const response = await fetch("/api/parse-cv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cvText,
          fileName: file.name,
        }),
      });

      const payload = (await response.json()) as ParseCvResponse;
      if (!response.ok) {
        throw new Error(payload.error ?? "Failed to parse CV.");
      }
      if (!payload.portfolio) {
        throw new Error("Parser returned no portfolio data.");
      }

      setScanState((prev) => ({
        ...prev,
        progress: 85,
        statusText: "Generating verification form…",
      }));

      onComplete(payload.portfolio);

      setScanState((prev) => ({
        ...prev,
        progress: 100,
        statusText: "Scan complete. Please review and confirm extracted data.",
      }));

      setTimeout(() => {
        setScanState((prev) => ({ ...prev, isScanning: false }));
      }, 1200);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";
      console.error("[AI Scan Error]", error);
      setScanState((prev) => ({
        ...prev,
        isScanning: false,
        error: message,
      }));
    }
  };

  return {
    scanState,
    startAiScan,
    clearError: () => setScanState((prev) => ({ ...prev, error: null })),
  };
}
