let screenWidth: number = window.innerWidth;

export const ex_screen = (event?: Event) => {
  const target = event.target as Window;
  screenWidth = target.innerWidth;
  return screenWidth;
}