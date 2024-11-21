import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";

export const ProductTabs = () => {
    return (
        <Tabs defaultValue="tab1">
            <TabsList className="flex">
                <TabsTrigger value="tab1" className="flex-1">
                    1
                </TabsTrigger>
                <TabsTrigger value="tab2" className="flex-1">
                    2
                </TabsTrigger>
            </TabsList>
            <TabsContent value="tab1" className="mt-6">
                Tab 1
            </TabsContent>
            <TabsContent value="tab2" className="mt-6">
                Tab 2
            </TabsContent>
        </Tabs>
    );
};
