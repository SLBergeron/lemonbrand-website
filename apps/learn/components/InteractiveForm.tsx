"use client";

import { useState } from "react";
import {
  Button,
  Input,
  Textarea,
  Label,
  Checkbox,
  cn,
} from "@lemonbrand/ui";
import { VoiceToTextInput } from "./VoiceToTextInput";

interface FormField {
  id: string;
  type: "text" | "textarea" | "select" | "radio" | "checkbox";
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  enableVoice?: boolean;
}

interface InteractiveFormProps {
  fields: FormField[];
  initialValues?: Record<string, unknown>;
  onSubmit: (values: Record<string, unknown>) => void;
  onGenerate?: (values: Record<string, unknown>) => string;
  submitLabel?: string;
  generateLabel?: string;
  className?: string;
}

export function InteractiveForm({
  fields,
  initialValues = {},
  onSubmit,
  onGenerate,
  submitLabel = "Save",
  generateLabel = "Generate",
  className,
}: InteractiveFormProps) {
  const [values, setValues] = useState<Record<string, unknown>>(initialValues);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);

  const handleChange = (fieldId: string, value: unknown) => {
    setValues((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  const handleGenerate = () => {
    if (onGenerate) {
      const content = onGenerate(values);
      setGeneratedContent(content);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-6", className)}>
      {fields.map((field) => (
        <div key={field.id} className="space-y-2">
          <Label htmlFor={field.id}>
            {field.label}
            {field.required && (
              <span className="text-destructive ml-1">*</span>
            )}
          </Label>

          {field.type === "text" && (
            <div className="relative">
              <Input
                id={field.id}
                type="text"
                placeholder={field.placeholder}
                value={(values[field.id] as string) || ""}
                onChange={(e) => handleChange(field.id, e.target.value)}
                required={field.required}
              />
            </div>
          )}

          {field.type === "textarea" && (
            <div className="space-y-2">
              {field.enableVoice && (
                <VoiceToTextInput
                  onTranscript={(text) => {
                    const current = (values[field.id] as string) || "";
                    handleChange(
                      field.id,
                      current ? `${current} ${text}` : text
                    );
                  }}
                />
              )}
              <Textarea
                id={field.id}
                placeholder={field.placeholder}
                value={(values[field.id] as string) || ""}
                onChange={(e) => handleChange(field.id, e.target.value)}
                required={field.required}
                rows={5}
              />
            </div>
          )}

          {field.type === "select" && field.options && (
            <select
              id={field.id}
              value={(values[field.id] as string) || ""}
              onChange={(e) => handleChange(field.id, e.target.value)}
              required={field.required}
              className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-colors focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm"
            >
              <option value="">Select...</option>
              {field.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}

          {field.type === "radio" && field.options && (
            <div className="space-y-2">
              {field.options.map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name={field.id}
                    value={option}
                    checked={(values[field.id] as string) === option}
                    onChange={() => handleChange(field.id, option)}
                    required={field.required}
                    className="size-4 accent-accent"
                  />
                  <span className="text-sm">{option}</span>
                </label>
              ))}
            </div>
          )}

          {field.type === "checkbox" && field.options && (
            <div className="space-y-2">
              {field.options.map((option) => {
                const selected = (values[field.id] as string[]) || [];
                const isChecked = selected.includes(option);

                return (
                  <label
                    key={option}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <Checkbox
                      checked={isChecked}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          handleChange(field.id, [...selected, option]);
                        } else {
                          handleChange(
                            field.id,
                            selected.filter((v) => v !== option)
                          );
                        }
                      }}
                    />
                    <span className="text-sm">{option}</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>
      ))}

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <Button type="submit">{submitLabel}</Button>
        {onGenerate && (
          <Button type="button" variant="outline" onClick={handleGenerate}>
            {generateLabel}
          </Button>
        )}
      </div>

      {/* Generated content preview */}
      {generatedContent && (
        <div className="mt-6 p-4 rounded-lg bg-muted border border-border">
          <h3 className="font-display font-semibold text-sm mb-2">
            Generated Content
          </h3>
          <pre className="text-sm font-mono whitespace-pre-wrap overflow-x-auto">
            {generatedContent}
          </pre>
        </div>
      )}
    </form>
  );
}
