import * as React from "react"
import { SVGProps } from "react"


const UserIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <path
      stroke="#232224"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={7.111}
      d="M60.889 68v-7.112a14.222 14.222 0 0 0-14.222-14.222H18.222A14.222 14.222 0 0 0 4 60.888V68M32.445 32.444c7.855 0 14.222-6.367 14.222-14.222C46.667 10.367 40.3 4 32.445 4c-7.855 0-14.222 6.367-14.222 14.222 0 7.855 6.367 14.222 14.222 14.222Z"
    />
  </svg>
)
export default UserIcon
