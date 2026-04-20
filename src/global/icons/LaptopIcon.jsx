const LaptopIcon = 
({width = 15, height = 12, color = "white", className = "", onClick}) => 
(<svg width={width} height={height} className={className} onClick={onClick}

viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.625 9.75H8.94234C8.925 10.2143 8.59758 10.5 8.175 10.5H6.75C6.31195 10.5 5.97609 10.0905 5.98195 9.75H0.375C0.16875 9.75 0 9.91875 0 10.125V10.5C0 11.325 0.675 12 1.5 12H13.5C14.325 12 15 11.325 15 10.5V10.125C15 9.91875 14.8313 9.75 14.625 9.75ZM13.5 1.125C13.5 0.50625 12.9938 0 12.375 0H2.625C2.00625 0 1.5 0.50625 1.5 1.125V9H13.5V1.125ZM12 7.5H3V1.5H12V7.5Z" fill={color}/>
</svg>
)

export default LaptopIcon;