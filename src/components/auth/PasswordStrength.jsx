import { getPasswordStrength }
from "../../hooks/usePasswordStrength";

function PasswordStrength({password}){

const result=
getPasswordStrength(password);

return(

<div className="password-strength">

<div className="strength-bar">

<div

className="strength-progress"

style={{

width:`${result.progress}%`

}}

></div>

</div>

<p>

Password Strength :

<strong>

{result.label}

</strong>

</p>

</div>

);

}

export default PasswordStrength;