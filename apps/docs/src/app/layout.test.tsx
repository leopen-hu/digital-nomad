import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Layout from "./layout";

describe("Layout Component", () => {
  it("renders the children inside the body tag", () => {
    render(
      <Layout>
        <p>Main Content</p>
      </Layout>
    );
    expect(screen.getByText("Main Content")).toBeInTheDocument();
  });

  it("renders the html and body tags", () => {
    const { container } = render(
      <Layout>
        <p>Main Content</p>
      </Layout>
    );
    expect(container.querySelector("html")).toBeInTheDocument();
    expect(container.querySelector("body")).toBeInTheDocument();
  });
});
