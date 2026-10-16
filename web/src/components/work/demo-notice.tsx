/** Visible only with local demo data, so sample projects are never mistaken for real ones. */
export function DemoNotice() {
  return (
    <p className="mb-10 inline-block border border-line-dark px-3 py-2.5 font-mono text-[0.58rem] text-muted-dark">
      SAMPLE DATA — 로컬 미리보기 전용. Sanity 연결 후 실제 프로젝트로 대체됩니다.
    </p>
  );
}
