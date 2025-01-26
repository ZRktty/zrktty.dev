import React from 'react';

const SiteVersion: React.FC = () => {
  const version = "2025";

  return (
    <div>
      <h5>Version</h5>
      <div>{version} &copy; Edition</div>
    </div>
  );
};

export default SiteVersion;