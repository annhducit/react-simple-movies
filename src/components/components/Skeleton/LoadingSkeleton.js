function LoadingSkeleton(probs, className) {
    return (
        <div
            className="skeleton"
            style={{
                width: probs.width,
                height: probs.height,
                borderRadius: probs.borderRadius,
            }}
        ></div>
    );
}

export default LoadingSkeleton;
