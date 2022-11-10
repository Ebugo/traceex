import { Button } from "@mui/material";
import React, { FC } from "react";
import SocialLogin, { Props } from "react-social-login";

export const SocialButton: FC<Props> = ({ children, triggerLogin, ...props }) => {
    return (
        <Button sx={{
            padding: "8px 12px",
            gap: "8px",
            // maxWidth: "230px",
            width: "100%",
            height: "36px",
            background: "#FFFFFF",
            border: "1px solid #DCDFE3",
            borderRadius: "4px",
            color: "#3B3E45",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "20px",
        }} onClick={triggerLogin} {...props}>
            {children}
        </Button>
    );
}

export default SocialLogin(SocialButton);