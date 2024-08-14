<script setup>
import { useRouter, useData } from 'vitepress';
import { resolveAcceptLanguage } from 'resolve-accept-language';
import { onMounted } from 'vue';

const { params } = useData();
const router = useRouter();

if (params.value.reason === "trailing-slash") {
    const newRoute = `${router.route.path.substring(0, router.route.path.length - ".html".length)}/`;
    router.go(newRoute);
} else if (params.value.reason === "translation") {
    onMounted(() => {
      const preferredLanguage = resolveAcceptLanguage(navigator.language, ["en-US", "nl-BE"], "nl-BE").split("-")[0];
      router.go(`/${preferredLanguage}${router.route.path}`);
    });
} else if (params.value.reason === "redirect") {
    const newRoute = params.value.to;
    router.go(newRoute);
}

</script>

Redirecting...
