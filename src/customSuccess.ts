// export default function successFunction(
//   s: boolean,
//   msg: string,
//   d: object
// ): object {
//   const r: object = {
//     success: s,
//     message: msg,
//     data: { ...d },
//   };
//   return r;
//

export default function successFunction<T>(
  s: boolean,
  msg: string,
  d: T
): {
  success: boolean;
  message: string;
  data: T;
} {
  return {
    success: s,
    message: msg,
    data: d,
  };
}

// export default successFunction;
