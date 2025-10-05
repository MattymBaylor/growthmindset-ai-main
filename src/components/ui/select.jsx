export const Select = ({children}) => <div>{children}</div>;
export const SelectTrigger = ({children}) => <button>{children}</button>;
export const SelectContent = ({children}) => <div>{children}</div>;
export const SelectItem = ({children, value}) => <option value={value}>{children}</option>;
export const SelectValue = ({placeholder}) => <span>{placeholder}</span>;
