export default function useIsMobile() {
	const { width } = useWindowSize();

	return computed(() => width.value <= 768);
}
