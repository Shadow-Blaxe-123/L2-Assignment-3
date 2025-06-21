function successFunction<T>(
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

export default successFunction;
