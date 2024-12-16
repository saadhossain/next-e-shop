import { ChangeEvent } from "react";

type CheckboxType = {
  type?: string;
  label: string;
  name: string;
  handleCategoryFilter: (e: ChangeEvent<HTMLInputElement>) => void;
  selectedCategory: string
};

const Checkbox = ({ type = "", label, name, handleCategoryFilter, selectedCategory }: CheckboxType) => (
  <label
    htmlFor={`${label}-${name}`}
    className={`checkbox ${type ? `checkbox--${type}` : ""}`}
  >
    <input
      name={name}
      onChange={handleCategoryFilter}
      type="checkbox"
      id={`${label}-${name}`}
      checked={selectedCategory === label}
    />
    <span className="checkbox__check" />
    <p>{label}</p>
  </label>
);

export default Checkbox;
