import { trpc } from "@/lib/trpc";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= rating ? "text-amber-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function formatDate(unixTimestamp: number) {
  const date = new Date(unixTimestamp * 1000);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 30) return `${diffDays} days ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

function ReviewCard({ review }: { review: { authorName: string; rating: number; text: string; time: number } }) {
  return (
    <div className="border border-[var(--hair)] p-6 bg-white">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-full bg-[var(--sand)] flex items-center justify-center text-[var(--head)] font-serif font-medium text-sm">
          {review.authorName.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-sans text-[14px] font-medium text-[var(--head)]">{review.authorName}</p>
          <p className="font-sans text-[12px] text-[var(--taupe)]">{formatDate(review.time)}</p>
        </div>
      </div>
      <StarRating rating={review.rating} />
      {review.text && (
        <p className="mt-3 font-sans text-[14px] text-[var(--muted)] leading-relaxed line-clamp-4">
          {review.text}
        </p>
      )}
    </div>
  );
}

export default function GoogleReviews() {
  const { data, isLoading } = trpc.reviews.getGoogleReviews.useQuery(undefined, {
    staleTime: 60 * 60 * 1000, // 1 hour
    retry: 1,
  });

  if (isLoading) {
    return (
      <section className="section bg-paper">
        <div className="container">
          <div className="animate-pulse">
            <div className="h-3 w-32 bg-[var(--sand)] mb-4"></div>
            <div className="h-6 w-64 bg-[var(--sand)] mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border border-[var(--hair)] p-6 h-48 bg-[var(--sand)] opacity-30"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!data) return null;

  const googleMapsUrl = `https://www.google.com/maps/place/?q=place_id:${data.placeId}`;

  return (
    <section className="section bg-paper">
      <div className="container">
        <span className="eyebrow">Client Reviews</span>
        <div className="tick mt-4"></div>
        <div className="mt-4 mb-8 flex flex-col sm:flex-row sm:items-center gap-4">
          <h2 className="mb-0">What our clients say</h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <StarRating rating={Math.round(data.rating)} />
              <span className="font-sans text-[15px] font-medium text-[var(--head)] ml-1">
                {data.rating.toFixed(1)}
              </span>
            </div>
            <span className="font-sans text-[13px] text-[var(--taupe)]">
              ({data.totalReviews} reviews on Google)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.reviews
            .filter((r: { rating: number; text: string }) => r.rating >= 4 && r.text.length > 20)
            .slice(0, 6)
            .map((review: { authorName: string; rating: number; text: string; time: number }, i: number) => (
              <ReviewCard key={i} review={review} />
            ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sans text-[14px] font-medium text-[var(--head)] hover:text-[var(--ink)] transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            See all {data.totalReviews} reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
}
