import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { cloneElement, ReactElement } from "react";

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  shoulMatchExactHref?: boolean;
}

const ActiveLink = ({
  children,
  shoulMatchExactHref = false,
  ...rest
}: ActiveLinkProps) => {
  const { asPath } = useRouter();
  let isActive = false;

  if (shoulMatchExactHref && asPath === rest.href) isActive = true;

  if (!shoulMatchExactHref && asPath.startsWith(String(rest.href)))
    isActive = true;

  return (
    <Link {...rest}>
      {cloneElement(children, {
        color: isActive ? "pink.400" : "gray.50",
      })}
    </Link>
  );
};

export default ActiveLink;
