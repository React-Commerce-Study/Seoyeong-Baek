import ReactDOM from 'react-dom';

interface ModalPortalProps {
  children: React.ReactNode;
}

export default function ModalPortal({ children }: ModalPortalProps) {
  const el = document.getElementById('modal') as HTMLElement;
  return ReactDOM.createPortal(children, el);
}
