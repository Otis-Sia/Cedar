'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function StudentOnboarding() {
  const router = useRouter();

  const [form, setForm] = useState({
    school: '',
    age: '',
    course: '',
    specialization: '',
    graduation_year: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);

    if (!supabase) {
      setLoading(false);
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { error } = await supabase.from('student_profiles').insert({
      user_id: user.id,
      school: form.school,
      age: form.age ? Number(form.age) : null,
      course: form.course,
      specialization: form.specialization,
      graduation_year: form.graduation_year ? Number(form.graduation_year) : null,
    });

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    await supabase
      .from('users')
      .update({ onboarding_completed: true })
      .eq('id', user.id);

    router.push('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto mt-10 space-y-4 px-4">
      <h1 className="text-xl font-semibold">Student Profile</h1>

      <input name="school" placeholder="School" onChange={handleChange} className="input" />
      <input name="age" type="number" placeholder="Age" onChange={handleChange} className="input" />
      <input name="course" placeholder="Course" onChange={handleChange} className="input" />
      <input
        name="specialization"
        placeholder="Specialization"
        onChange={handleChange}
        className="input"
      />
      <input
        name="graduation_year"
        type="number"
        placeholder="Graduation Year"
        onChange={handleChange}
        className="input"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded disabled:opacity-60"
      >
        {loading ? 'Saving...' : 'Continue'}
      </button>
    </div>
  );
}
