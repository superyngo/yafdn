export async function load({params}) {
  const mdComp = await import(`../../../../posts.md/${params.slug}.md`);
  return {mdComp};
}
