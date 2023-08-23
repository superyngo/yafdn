export async function load({params}) {
  const mdComp = await import(`../../../../md/posts/${params.slug}.md`);
  return {mdComp};
}
