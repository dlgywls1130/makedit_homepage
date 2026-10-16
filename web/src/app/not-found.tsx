import { ButtonLink, gutter, cn, eyebrowClass } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <div className={cn("flex min-h-svh flex-col justify-end bg-ink pt-36 pb-24 text-paper", gutter)}>
      <p className={cn(eyebrowClass, "text-muted-dark")}>
        <span className="text-accent">404</span> / Not found
      </p>
      <h1 className="mt-10 text-hero font-extrabold tracking-[-0.085em]">
        NOTHING TO
        <br />
        <span className="text-transparent [-webkit-text-stroke:1px_var(--color-paper)]">EDIT HERE.</span>
      </h1>
      <p className="mt-16 max-w-md text-[0.9rem] leading-relaxed text-muted-dark">
        요청하신 페이지를 찾을 수 없습니다. 주소가 바뀌었거나 더 이상 공개되지 않는 페이지일 수 있습니다.
      </p>
      <div className="mt-10 flex flex-wrap gap-2.5">
        <ButtonLink href="/">홈으로</ButtonLink>
        <ButtonLink href="/work" variant="ghost">
          프로젝트 보기
        </ButtonLink>
      </div>
    </div>
  );
}
