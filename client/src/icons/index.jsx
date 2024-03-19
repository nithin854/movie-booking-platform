const IconPropTypes = {
  color: String,
  height: String,
  width: String,
};
export function IconBxMoviePlay(props) {
  const { color, height, width } = props;
  return (
    <svg
      viewBox="0 0 24 24"
      fill={color}
      height={height}
      width={width}
      {...props}
    >
      <path d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zm.001 6c-.001 0-.001 0 0 0h-.465l-2.667-4H20l.001 4zM9.536 9L6.869 5h2.596l2.667 4H9.536zm5 0l-2.667-4h2.596l2.667 4h-2.596zM4 5h.465l2.667 4H4V5zm0 14v-8h16l.002 8H4z" />
      <path d="M10 18l5.5-3-5.5-3z" />
    </svg>
  );
}

export function IconBxUserCircle(props) {
  const { color, height, width } = props;
  return (
    <svg
      viewBox="0 0 24 24"
      fill={color}
      height={height}
      width={width}
      {...props}
    >
      <path d="M12 2A10.13 10.13 0 002 12a10 10 0 004 7.92V20h.1a9.7 9.7 0 0011.8 0h.1v-.08A10 10 0 0022 12 10.13 10.13 0 0012 2zM8.07 18.93A3 3 0 0111 16.57h2a3 3 0 012.93 2.36 7.75 7.75 0 01-7.86 0zm9.54-1.29A5 5 0 0013 14.57h-2a5 5 0 00-4.61 3.07A8 8 0 014 12a8.1 8.1 0 018-8 8.1 8.1 0 018 8 8 8 0 01-2.39 5.64z" />
      <path d="M12 6a3.91 3.91 0 00-4 4 3.91 3.91 0 004 4 3.91 3.91 0 004-4 3.91 3.91 0 00-4-4zm0 6a1.91 1.91 0 01-2-2 1.91 1.91 0 012-2 1.91 1.91 0 012 2 1.91 1.91 0 01-2 2z" />
    </svg>
  );
}

IconBxUserCircle.propTypes = IconPropTypes;
IconBxMoviePlay.propTypes = IconPropTypes;
