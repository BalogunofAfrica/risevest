export function format(x: number | string) {
  return x.toString().replaceAll(/\B(?=(\d{3})+(?!\d))/g, ",");
}
