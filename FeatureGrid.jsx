import React from "react";
import { features } from "../data/features";

export default function FeatureGrid() {
  return (
    <section className="section" id="features">
      <div className="sectionHeader">
        <p className="eyebrow">Feature list</p>
        <h2>Everything implemented in SMART CHEF</h2>
      </div>
      <div className="featureGrid">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <article className="featureCard" key={feature.title}>
              <Icon size={24} />
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
