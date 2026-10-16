import { ButtonLink, Container } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <Container className="py-28 md:py-40">
      <p className="font-mono text-xs tracking-[0.14em] text-muted uppercase">
        <span className="text-accent">404</span> — Not found
      </p>
      <h1 className="mt-8 font-display text-hero font-extrabold tracking-[-0.05em] uppercase">
        Nothing
        <br />
        to edit here.
      </h1>
      <p className="mt-8 max-w-md text-muted">요청하신 페이지를 찾을 수 없습니다. 주소가 바뀌었거나 더 이상 공개되지 않는 페이지일 수 있습니다.</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/">홈으로</ButtonLink>
        <ButtonLink href="/work" variant="outline">
          프로젝트 보기
        </ButtonLink>
      </div>
    </Container>
  );
}
