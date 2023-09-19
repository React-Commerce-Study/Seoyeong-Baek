import { useState } from 'react';
import Button from '../../Buttons/Button';

interface CheckBoxWrapperProps {
  children: React.ReactNode;
  success: string;
}

export default function AgreeCheckBox({ children, success }: CheckBoxWrapperProps) {
  const [isChecked, setIsChecked] = useState(false);

  // 동의하기 눌렀을 때만 가입하기버튼 active
  const handleCheck = () => {
    console.log('check');
    !isChecked ? setIsChecked(true) : setIsChecked(false);
  };

  return (
    <>
      <div className="check-box">
        <input type="checkbox" id="agree" />
        <label htmlFor="agree" onClick={handleCheck} className={isChecked ? 'checked' : ''}>
          {children}
        </label>
      </div>
      <div className="btn-box">
        <Button type="submit" fontSize="24px" disabled={!isChecked}>
          {success}
        </Button>
      </div>
    </>
  );
}
