import React, { useState } from "react";
import { profile } from "../../mock";
import { ArrowUpRight, Copy, Check } from "lucide-react";
import { toast } from "sonner";

const INITIAL_FORM = {
  name: "",
  email: "",
  message: "",
};

function validateInquiry(form) {
  if (!form.name || !form.email || !form.message) {
    return "Please fill in your name, email and message.";
  }
  return null;
}

async function sendToSlack(form) {
  const res = await fetch("http://localhost:5000/api/slack", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: form.name,
      email: form.email,
      message: form.message,
    }),
  });

  if (!res.ok) {
    throw new Error("Backend API failed");
  }

  return await res.json();
}

function persistInquiry(form) {
  try {
    const drafts = JSON.parse(
      localStorage.getItem("portfolio.inquiries") || "[]"
    );

    drafts.push({
      ...form,
      at: new Date().toISOString(),
    });

    localStorage.setItem(
      "portfolio.inquiries",
      JSON.stringify(drafts)
    );
  } catch (_) {}
}

function useContactForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (patch) => {
    setForm((prev) => ({
      ...prev,
      ...patch,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();

    const error = validateInquiry(form);

    if (error) {
      toast("Missing details", {
        description: error,
      });
      return;
    }

    setLoading(true);

    try {
      await sendToSlack(form);
      persistInquiry(form);

      setSent(true);

      toast("Message sent!", {
        description: "Your inquiry has been sent successfully.",
      });

      setForm(INITIAL_FORM);

      setTimeout(() => {
        setSent(false);
      }, 4000);
    } catch (error) {
      toast("Something went wrong", {
        description:
          "Please email me directly at " + profile.email,
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    sent,
    loading,
    update,
    submit,
  };
}

function useClipboard(value) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);

      setCopied(true);

      toast("Email copied", {
        description: value,
      });

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch (_) {
      toast("Couldn't copy", {
        description: value,
      });
    }
  };

  return {
    copied,
    copy,
  };
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}) {
  return (
    <div>
      <label className="font-mono-ui text-[10px] tracking-[0.22em] uppercase text-[#141414]/60 mb-2 block">
        {label}
      </label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border-b border-[#141414]/25 focus:border-[#141414] outline-none py-3 text-[15px] placeholder:text-[#141414]/40 transition-colors"
      />
    </div>
  );
}

function ContactStatement({ onCopyEmail, copied }) {
  return (
    <div className="md:col-span-5">
      <h2 className="font-display text-[clamp(2rem,5vw,4.2rem)] leading-[0.98] tracking-[-0.02em]">
        {"Let's make "}
        <em className="italic text-[#B8593C] font-normal">
          something
        </em>
        <br />
        {"worth keeping."}
      </h2>

      <p className="mt-6 text-[15px] leading-[1.7] text-[#141414]/75 max-w-[46ch]">
        Currently booking product partnerships and brand
        collaborations. Tell me a little about what you are
        building — I read every note personally.
      </p>

      <div className="mt-8 flex flex-col gap-3">
        <button
          type="button"
          onClick={onCopyEmail}
          className="group inline-flex items-center justify-between gap-4 rounded-full bg-[#141414] text-[#F5F1E8] pl-5 pr-2 py-2 hover:bg-[#B8593C] transition-colors"
        >
          <span className="font-display text-[15px] md:text-[17px] truncate">
            {profile.email}
          </span>

          <span className="w-10 h-10 rounded-full bg-[#F5F1E8] text-[#141414] grid place-items-center shrink-0">
            {copied ? <Check size={15} /> : <Copy size={15} />}
          </span>
        </button>

        <button
          type="button"
          onClick={() =>
            toast("Calendar opening soon", {
              description: "For now, drop your inquiry below.",
            })
          }
          className="inline-flex items-center justify-between gap-4 rounded-full border border-[#141414]/20 px-5 py-3 hover:border-[#141414] transition-colors"
        >
          <span className="font-display text-[15px]">
            Book a 20-min intro call
          </span>

          <ArrowUpRight size={16} />
        </button>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-6">
        <div>
          <div className="font-mono-ui text-[10px] tracking-[0.22em] uppercase text-[#141414]/60 mb-1">
            Studio
          </div>
          <div className="text-[14px]">{profile.location}</div>
        </div>

        <div>
          <div className="font-mono-ui text-[10px] tracking-[0.22em] uppercase text-[#141414]/60 mb-1">
            Hours
          </div>
          <div className="text-[14px]">Mon — Fri</div>
        </div>
      </div>
    </div>
  );
}

function ContactForm({
  form,
  sent,
  loading,
  update,
  submit,
}) {
  return (
    <form
      onSubmit={submit}
      className="md:col-span-7 bg-[#EFEADE] rounded-sm p-6 md:p-8 border border-[#141414]/10 self-start"
    >
      <div className="font-mono-ui text-[11px] tracking-[0.22em] uppercase text-[#141414]/60 mb-5">
        Project Inquiry — Form
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field
          label="Your Name"
          value={form.name}
          onChange={(value) => update({ name: value })}
          placeholder="John Doe"
        />

        <Field
          label="Email"
          type="email"
          value={form.email}
          onChange={(value) => update({ email: value })}
          placeholder="john@example.com"
        />
      </div>

      <div className="mt-5">
        <label className="font-mono-ui text-[10px] tracking-[0.22em] uppercase text-[#141414]/60 mb-2 block">
          Tell me about the project
        </label>

        <textarea
          rows={4}
          value={form.message}
          onChange={(e) =>
            update({
              message: e.target.value,
            })
          }
          placeholder="A few lines about your project, timeline and goals."
          className="w-full bg-transparent border-b border-[#141414]/25 focus:border-[#141414] outline-none py-3 text-[15px] leading-[1.6] placeholder:text-[#141414]/40 resize-none transition-colors"
        />
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <span className="font-mono-ui text-[10px] tracking-[0.22em] uppercase text-[#141414]/55">
          {sent
            ? "Sent — thank you."
            : loading
            ? "Sending..."
            : "I reply within 24 hours."}
        </span>

        <button
          type="submit"
          disabled={loading}
          className="group inline-flex items-center gap-3 rounded-full bg-[#B8593C] text-[#F5F1E8] pl-5 pr-2 py-2 hover:bg-[#141414] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="font-display text-[15px]">
            {loading ? "Sending..." : "Send Inquiry"}
          </span>

          <span className="w-9 h-9 rounded-full bg-[#F5F1E8] text-[#141414] grid place-items-center transition-transform duration-300 group-hover:rotate-[-45deg]">
            <ArrowUpRight size={15} />
          </span>
        </button>
      </div>
    </form>
  );
}

export default function Contact() {
  const {
    form,
    sent,
    loading,
    update,
    submit,
  } = useContactForm();

  const { copied, copy } = useClipboard(profile.email);

  return (
    <section
      id="contact"
      className="py-24 md:py-32 border-t border-[#141414]/10"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex items-center gap-3 font-mono-ui text-[11px] tracking-[0.22em] uppercase text-[#141414]/60 mb-10">
          <span className="w-8 h-px bg-[#141414]/40" />
          Contact — C · 06
        </div>

        <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-start">
          <ContactStatement
            onCopyEmail={copy}
            copied={copied}
          />

          <ContactForm
            form={form}
            sent={sent}
            loading={loading}
            update={update}
            submit={submit}
          />
        </div>
      </div>
    </section>
  );
}