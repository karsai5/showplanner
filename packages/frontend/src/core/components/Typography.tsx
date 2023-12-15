import cc from "classnames";

export const H2: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return <h2 className={cc("text-4xl font-bold", className)}> {children}</h2>;
};

export const H3: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return <h2 className={cc("text-3xl font-bold", className)}> {children}</h2>;
};
