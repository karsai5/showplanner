export const Pronoun: React.FunctionComponent<
  React.PropsWithChildren<{ pronoun?: string }>
> = ({ pronoun }) => {
  switch (pronoun) {
    case "him":
      return <>Him/He</>;
    case "her":
      return <>Her/She</>;
    case "them":
      return <>Them/They</>;
    default:
      return <>{pronoun}</>;
  }
};
