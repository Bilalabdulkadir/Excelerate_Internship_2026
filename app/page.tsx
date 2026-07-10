// Re-generate this page at most once every 10 seconds (ISR).
export const revalidate = 10 // seconds

interface Post {
  title: string
  id: number
}

export default async function Page() {
  // Fetched at build time, then re-fetched in the background every 10s.
  const res = await fetch("https://api.vercel.app/blog")
  const posts = (await res.json()) as Post[]

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold text-balance">Blog Posts</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Statically rendered and revalidated every 10 seconds.
        </p>
      </header>

      <ul className="flex flex-col gap-3">
        {posts.map((post: Post) => (
          <li key={post.id} className="border-b border-border pb-3 text-pretty">
            {post.title}
          </li>
        ))}
      </ul>
    </main>
  )
}
