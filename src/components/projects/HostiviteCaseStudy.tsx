interface Props {
  caseStudy: string;
  demoData?: Record<string, unknown>;
}

export function HostiviteCaseStudy({ caseStudy, demoData }: Props) {
  const sections = caseStudy.split(/^## /m).filter(Boolean);

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold tracking-tight mb-8">
        Case Study
      </h2>

      <div className="space-y-8">
        {sections.map((section, i) => {
          const [title, ...body] = section.split('\n');
          return (
            <div
              key={i}
              className="pl-6 border-l-2 border-accent/30 space-y-3"
            >
              <h3 className="text-lg font-semibold text-accent">{title}</h3>
              {body
                .filter((line) => line.trim())
                .map((line, j) => {
                  if (line.startsWith('- **')) {
                    const match = line.match(/^- \*\*(.+?)\*\*:?\s*(.*)$/);
                    if (match) {
                      return (
                        <div key={j} className="flex gap-2">
                          <span className="font-medium text-foreground text-sm">
                            {match[1]}:
                          </span>
                          <span className="text-sm text-muted">
                            {match[2]}
                          </span>
                        </div>
                      );
                    }
                  }
                  return (
                    <p
                      key={j}
                      className="text-sm text-muted leading-relaxed"
                    >
                      {line}
                    </p>
                  );
                })}
            </div>
          );
        })}
      </div>

      {/* Demo data — only shown in admin/demo mode */}
      {demoData && (
        <div className="mt-10 p-6 rounded-xl border border-amber-500/30 bg-amber-500/5">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider">
              Demo Mode — Anonymized Data
            </h3>
          </div>
          <pre className="text-xs font-mono text-muted overflow-x-auto">
            {JSON.stringify(demoData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
