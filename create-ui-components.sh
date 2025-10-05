#!/bin/bash

# Create navigation-menu
cat > src/components/ui/navigation-menu.jsx << 'END'
export const NavigationMenu = ({children}) => <nav>{children}</nav>;
export const NavigationMenuList = ({children}) => <ul>{children}</ul>;
export const NavigationMenuItem = ({children}) => <li>{children}</li>;
export const NavigationMenuTrigger = ({children}) => <button>{children}</button>;
export const NavigationMenuContent = ({children}) => <div>{children}</div>;
export const NavigationMenuLink = ({children, ...props}) => <a {...props}>{children}</a>;
END

# Create dropdown-menu
cat > src/components/ui/dropdown-menu.jsx << 'END'
export const DropdownMenu = ({children}) => <div>{children}</div>;
export const DropdownMenuTrigger = ({children}) => <>{children}</>;
export const DropdownMenuContent = ({children}) => <div>{children}</div>;
export const DropdownMenuItem = ({children, ...props}) => <button {...props}>{children}</button>;
export const DropdownMenuLabel = ({children}) => <div>{children}</div>;
export const DropdownMenuSeparator = () => <hr />;
END

# Create dialog
cat > src/components/ui/dialog.jsx << 'END'
export const Dialog = ({children}) => <div>{children}</div>;
export const DialogTrigger = ({children}) => <>{children}</>;
export const DialogContent = ({children}) => <div>{children}</div>;
export const DialogHeader = ({children}) => <div>{children}</div>;
export const DialogTitle = ({children}) => <h2>{children}</h2>;
export const DialogDescription = ({children}) => <p>{children}</p>;
END

# Create select
cat > src/components/ui/select.jsx << 'END'
export const Select = ({children}) => <div>{children}</div>;
export const SelectTrigger = ({children}) => <button>{children}</button>;
export const SelectContent = ({children}) => <div>{children}</div>;
export const SelectItem = ({children, value}) => <option value={value}>{children}</option>;
export const SelectValue = ({placeholder}) => <span>{placeholder}</span>;
END

# Create switch
cat > src/components/ui/switch.jsx << 'END'
export const Switch = (props) => <input type="checkbox" {...props} />;
END

# Create toast
cat > src/components/ui/toast.jsx << 'END'
export const Toast = ({children}) => <div>{children}</div>;
export const ToastAction = ({children}) => <button>{children}</button>;
END

echo "All UI components created!"
