try {
	const { default: coreContainer } = await import('#core/containers/index.js');
} catch (error) {
	console.log(error);
}
