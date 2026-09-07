import { Link } from "react-router";

type SmartLinkProps = {
  to: string;
  className?: string;
  children: React.ReactNode;
};

/**
 * Client-side `<Link>` for internal paths, plain `<a>` for anything else
 * (mailto:, tel:, external URLs) which the router must not intercept.
 */
export function SmartLink({ to, className, children }: SmartLinkProps) {
  if (to.startsWith("/")) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={to} className={className}>
      {children}
    </a>
  );
}
