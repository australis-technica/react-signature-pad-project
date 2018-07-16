import { Component } from "react";
import * as React from "react";
import "./input-box.css";

export default class InputBox extends Component<{
  type?: "text" | "checkbox" | "number";
  value?: string | number | string[];
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  label: React.ReactNode;
  min?: number;
  max?: number;
  step?: number;
  unit?: React.ReactNode;
  helper?: React.ReactNode;
}> {
  renderHelper = () => {
    if (!this.props.helper) return null;

    if (typeof this.props.helper === "string")
      return <span className="input-box-helper">{this.props.helper}</span>;
    return this.props.helper;
  };
  render() {
    return (
      <div className="input-root">
        {this.props.type !== "checkbox" && <label children={this.props.label} className="input-box-label" />}
        <div className="input-box-row">
          {this.props.type === "checkbox" && <label children={this.props.label} className="input-box-label" />}
          <input
            type={this.props.type}
            value={this.props.value}
            checked={this.props.checked}
            min={this.props.min}
            max={this.props.max}
            step={this.props.step}
            onChange={this.props.onChange}
            className="input-box-input"
          />
          {this.props.unit}
        </div>
        {this.renderHelper()}
      </div>
    );
  }
}
