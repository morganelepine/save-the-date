import Confettis from "../../components/utils/Confettis";

const Celebration = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    return (
        <div
            aria-hidden="true"
            className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
        >
            {isMobile ? (
                <>
                    <div className="absolute right-[12%] top-[20%]">
                        <Confettis />
                    </div>
                    <div className="absolute left-[20%] bottom-[18%]">
                        <Confettis />
                    </div>
                </>
            ) : (
                <>
                    <div className="absolute left-[12%] top-[20%]">
                        <Confettis />
                    </div>
                    <div className="absolute right-[12%] top-[20%]">
                        <Confettis />
                    </div>
                    <div className="absolute left-[20%] bottom-[18%]">
                        <Confettis />
                    </div>
                    <div className="absolute right-[20%] bottom-[18%]">
                        <Confettis />
                    </div>
                </>
            )}
        </div>
    );
};

export default Celebration;
