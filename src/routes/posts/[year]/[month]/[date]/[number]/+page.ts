export async function load({params}) {
  const mdComp = await import(`../../../../../../md/posts/${params.number}.md`);
  return {mdComp};
}
