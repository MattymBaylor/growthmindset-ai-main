export const DropdownMenu = ({children}) => <div>{children}</div>;
export const DropdownMenuTrigger = ({children}) => <>{children}</>;
export const DropdownMenuContent = ({children}) => <div>{children}</div>;
export const DropdownMenuItem = ({children, ...props}) => <button {...props}>{children}</button>;
export const DropdownMenuLabel = ({children}) => <div>{children}</div>;
export const DropdownMenuSeparator = () => <hr />;
