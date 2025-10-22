import React from "react";

interface SimplePageHeaderProps {
  title: string;
  description: string;
}

const SimplePageHeader = ({ title, description }: SimplePageHeaderProps) => {
  return (
    <div className="text-center font-bengali">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight gradient-text">
        {title}
      </h1>
      <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
        {description}
      </p>
    </div>
  );
};

export default SimplePageHeader;
