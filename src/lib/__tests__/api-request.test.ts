import { describe,it,expect } from "vitest";
import { readJsonBody } from "@/lib/api-request";

describe("bounded JSON request parsing",()=>{
  it("rejects large bodies even when content-length is absent or forged",async()=>{
    for(const headers of [new Headers(),new Headers({"content-length":"1"})]) {
      const result=await readJsonBody(new Request("http://localhost/api/contact",{method:"POST",headers,body:JSON.stringify({message:"a".repeat(32001)})}));
      expect(result.error?.status).toBe(413);
    }
  });
  it("accepts valid data and returns null for malformed JSON",async()=>{
    expect((await readJsonBody(new Request("http://localhost",{method:"POST",body:'{"name":"ação"}'}))).payload).toEqual({name:"ação"});
    expect((await readJsonBody(new Request("http://localhost",{method:"POST",body:"{"}))).payload).toBeNull();
  });
});
