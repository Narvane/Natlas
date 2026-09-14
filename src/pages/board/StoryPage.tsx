import StoryReactFlow from "./StoryReactFlow.tsx";
import {StoryFlow} from "./types.ts";
import {Story as Story} from "../../models/story.ts";

export default function StoryPage() {

    return (
        <StoryReactFlow story={new StoryFlow(new Story())}/>
    )
}