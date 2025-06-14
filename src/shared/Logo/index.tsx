import logo from '../../assets/logo.png';


interface LogoProps {
  className?: string;
}

function Logo({ className = ''}: LogoProps) {
  return <img src={logo} className={className} />;
}

export default Logo;