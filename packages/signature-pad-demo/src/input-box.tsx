import { Component } from "react";
import * as React from "react";
import "./input-box.css"

export default class InputBox extends Component<{
  type?: "text" | "checkbox" | "number";
  value?: string|number|string[];
  checked?: boolean;
  onChange?:React.ChangeEventHandler<HTMLInputElement>;
  label: React.ReactNode;
  min?:number;
  max?:number;
  step?:number;
}> {  
  
  render() {
    return (
      <div className="input-box-root">
        <label
          children={this.props.label}
          className="input-box-label"
        />
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
      </div>
    );
  }
}
