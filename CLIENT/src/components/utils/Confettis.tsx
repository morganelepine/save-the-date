import ConfettiExplosion from "react-confetti-explosion";

const Confettis = () => {
    return (
        <ConfettiExplosion
            force={0.8}
            duration={3000}
            particleCount={200}
            width={1600}
            colors={["#07a2f1", "#ff9803", "#e22e69", "#ae8dee", "#09b584"]}
        />
    );
};

export default Confettis;
