export const Face = ({ imageUrl = "me.jpg" }) => {
  return (
    <svg width="220" height="220" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="110"
        cy="110"
        r="100"
        stroke="lightBlue"
        strokeWidth="5"
        fill="none"
      />
      <clipPath id="circleView">
        <circle cx="110" cy="110" r="90" />
      </clipPath>
      <image
        href={imageUrl}
        width="180"
        height="180"
        x="20"
        y="20"
        clipPath="url(#circleView)"
      />
    </svg>
  );
};
