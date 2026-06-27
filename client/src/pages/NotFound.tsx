import { Link } from "wouter";
import Layout from "@/components/Layout";

export default function NotFound() {
  return (
    <Layout>
      <section className="section bg-paper">
        <div className="container text-center">
          <div className="tick mx-auto"></div>
          <span className="eyebrow">Page Not Found</span>
          <h1 className="mt-4 mb-6">404</h1>
          <p className="text-muted-custom font-sans text-[17px] max-w-md mx-auto mb-8 leading-relaxed">
            Sorry, the page you are looking for doesn't exist.
            It may have been moved or deleted.
          </p>
          <Link href="/" className="btn-solid">
            Return Home
          </Link>
        </div>
      </section>
    </Layout>
  );
}
