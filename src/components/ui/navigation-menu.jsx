export const NavigationMenu = ({children}) => <nav>{children}</nav>;
export const NavigationMenuList = ({children}) => <ul>{children}</ul>;
export const NavigationMenuItem = ({children}) => <li>{children}</li>;
export const NavigationMenuTrigger = ({children}) => <button>{children}</button>;
export const NavigationMenuContent = ({children}) => <div>{children}</div>;
export const NavigationMenuLink = ({children, ...props}) => <a {...props}>{children}</a>;
