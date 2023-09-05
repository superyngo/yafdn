let test = 1;

export async function testPlus(num = 0): Promise<number> {
  console.log("In testPlus", test);
  test += num;
  return test;
}
