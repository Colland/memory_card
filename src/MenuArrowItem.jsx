import menuArrow from "./assets/menu_arrow.png";

function menuArrowItem({ text, active = false, onClick}) {
    return (
        <li
            className="justify-self-center relative cursor-pointer"
            onClick={onClick}
        >

            { active && <img src={menuArrow}
                    alt="menu arrow"
                    style={{ imageRendering: "pixelated" }}
                    className= "w-[15px] h-[21px] absolute top-[12px] left-[-30px]"/> 
            }
            {text}
        </li>
    )
}

export default menuArrowItem;