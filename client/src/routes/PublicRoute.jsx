import React from "react";
function PublicRoute({ children }) {
  return (
    <>
      <main className="public-bg-wrapper"></main>
      <div className="public-content">{children}</div>
    </>
  );
}

PublicRoute.propTypes = {
  children: React.any,
};

export default PublicRoute;
